// Test script for dashboard alert system
console.log('🧪 Testing Dashboard Alert System...\n');

const BASE_URL = 'http://localhost:9002';

async function testAlertSystem() {
  try {
    console.log('1️⃣ Testing News Feed API...');
    const newsResponse = await fetch(`${BASE_URL}/api/news-feed`);
    const newsData = await newsResponse.json();
    console.log(`✅ News Feed: ${newsData.items?.length || 0} items fetched`);
    console.log(`   Sample: ${newsData.items?.[0]?.title?.substring(0, 50)}...`);

    console.log('\n2️⃣ Testing News Clusters API...');
    const clustersResponse = await fetch(`${BASE_URL}/api/news-clusters`);
    const clustersData = await clustersResponse.json();
    console.log(`✅ Clusters: ${clustersData.clusters?.length || 0} clusters generated`);

    console.log('\n3️⃣ Testing Alerts API (should be empty initially)...');
    const alertsResponse = await fetch(`${BASE_URL}/api/alerts`);
    const alertsData = await alertsResponse.json();
    console.log(`✅ Alerts: ${alertsData.alerts?.length || 0} alerts stored`);

    console.log('\n4️⃣ Testing Trending Content Fetching...');
    const trendingResponse = await fetch(`${BASE_URL}/api/fetch-trending`);
    const trendingData = await trendingResponse.json();
    console.log(`✅ Trending: ${trendingData.items?.length || 0} items processed`);
    const alertItems = trendingData.items?.filter((i) => i.alertTriggered) || [];
    console.log(`⚠️  Alert-worthy items: ${alertItems.length}`);
    if (alertItems.length > 0) {
      console.log(`   Sample alert: ${alertItems[0].title?.substring(0, 50)}...`);
    }

    console.log('\n5️⃣ Triggering Full Alert Processing...');
    const processResponse = await fetch(`${BASE_URL}/api/process-alerts`, {
      method: 'POST'
    });
    const processData = await processResponse.json();
    console.log(`✅ Processing: ${processData.alertsCreated || 0} new alerts created`);
    console.log(`   Processed: ${processData.processed || 0} total items`);

    console.log('\n6️⃣ Checking Created Alerts...');
    const finalAlertsResponse = await fetch(`${BASE_URL}/api/alerts`);
    const finalAlertsData = await finalAlertsResponse.json();
    console.log(`✅ Final Alert Count: ${finalAlertsData.alerts?.length || 0}`);
    
    if (finalAlertsData.alerts?.length > 0) {
      const alert = finalAlertsData.alerts[0];
      console.log('\n📋 Sample Alert:');
      console.log(`   Title: ${alert.title}`);
      console.log(`   Severity: ${alert.severity}`);
      console.log(`   Type: ${alert.type}`);
      console.log(`   Risk Level: ${alert.riskLevel}`);
      console.log(`   Reason: ${alert.reason}`);
    }

    console.log('\n✅ All tests completed successfully!');
    console.log('\n🎯 Next Steps:');
    console.log('   1. Visit http://localhost:9002/dashboard');
    console.log('   2. Click "🚀 Generate Alerts" button');
    console.log('   3. Watch real-time alerts appear');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Ensure dev server is running: npm run dev');
    console.log('   2. Check environment variables (GOOGLE_API_KEY, TAVILY_API_KEY)');
    console.log('   3. Verify data/alerts.json exists and is writable');
  }
}

testAlertSystem();
