import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Step 1: Fetch trending content
    const trendingResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/fetch-trending`);
    const trendingData = await trendingResponse.json();

    if (!trendingData.success || !trendingData.items) {
      return NextResponse.json({ error: 'Failed to fetch trending' }, { status: 500 });
    }

    // Step 2: Filter items that triggered alerts
    const alertItems = trendingData.items.filter((item: any) => item.alertTriggered);

    // Step 3: Verify with Tavily (quick burst search)
    const verifiedAlerts = await Promise.all(
      alertItems.map(async (item: any) => {
        const verification = await quickVerification(item.claim);
        return {
          ...item,
          verification
        };
      })
    );

    // Step 4: Create alerts for high-risk items
    const createdAlerts = [];
    for (const item of verifiedAlerts) {
      const shouldCreateAlert = item.riskLevel > 60 || item.verification.contradictoryEvidence;

      if (shouldCreateAlert) {
        const alert = {
          claim: item.claim,
          title: item.title,
          riskLevel: item.riskLevel,
          type: item.alertType,
          reason: generateReason(item),
          platforms: [item.platform],
          source: item.link,
          verification: item.verification,
          severity: item.riskLevel > 80 ? 'HIGH' : item.riskLevel > 60 ? 'MEDIUM' : 'LOW'
        };

        // Save alert
        const saveResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/alerts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alert)
        });

        const saved = await saveResponse.json();
        createdAlerts.push(saved.alert);
      }
    }

    return NextResponse.json({
      success: true,
      alertsCreated: createdAlerts.length,
      alerts: createdAlerts,
      processed: trendingData.items.length
    });
  } catch (error) {
    console.error('Error processing alerts:', error);
    return NextResponse.json(
      { error: 'Failed to process alerts' },
      { status: 500 }
    );
  }
}

async function quickVerification(claim: string) {
  try {
    const queries = [
      claim,
      `${claim} fact check`,
      `${claim} debunk`,
      `${claim} verified news`
    ];

    // Run Tavily searches in parallel
    const searches = await Promise.all(
      queries.map(async (query) => {
        try {
          const response = await fetch('https://api.tavily.com/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              api_key: process.env.TAVILY_API_KEY,
              query: query,
              search_depth: 'basic',
              max_results: 3
            })
          });

          if (!response.ok) {
            return { results: [] };
          }

          return await response.json();
        } catch (error) {
          console.error('Tavily search error:', error);
          return { results: [] };
        }
      })
    );

    // Analyze results
    const allResults = searches.flatMap(s => s.results || []);
    const sourceCount = allResults.length;
    
    // Check for contradictory evidence
    const contradictionKeywords = ['false', 'debunk', 'fake', 'misleading', 'incorrect', 'untrue'];
    const contradictoryResults = allResults.filter(r => 
      contradictionKeywords.some(kw => 
        r.title?.toLowerCase().includes(kw) || r.content?.toLowerCase().includes(kw)
      )
    );

    return {
      sourceCount,
      contradictoryEvidence: contradictoryResults.length >= 2,
      contradictoryCount: contradictoryResults.length,
      reliability: sourceCount > 0 ? 'verified' : 'unverified',
      sources: allResults.slice(0, 3).map(r => ({
        title: r.title,
        url: r.url,
        score: r.score
      }))
    };
  } catch (error) {
    console.error('Error in quick verification:', error);
    return {
      sourceCount: 0,
      contradictoryEvidence: false,
      contradictoryCount: 0,
      reliability: 'unknown',
      sources: []
    };
  }
}

function generateReason(item: any): string {
  const reasons = [];

  if (item.verification.contradictoryEvidence) {
    reasons.push('Contradictory evidence found');
  }
  
  if (item.alertType.includes('VOLUME')) {
    reasons.push('Volume spike detected');
  }

  if (item.alertType.includes('EMOTIONAL')) {
    reasons.push('Emotional manipulation detected');
  }

  if (item.alertType.includes('SENSITIVE')) {
    reasons.push('Sensitive topic');
  }

  if (item.alertType.includes('RUMOR')) {
    reasons.push('Rumor pattern detected');
  }

  return reasons.join(' + ') || 'Multiple risk factors';
}
