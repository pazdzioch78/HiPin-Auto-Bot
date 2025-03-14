const axios = require('axios');
const fs = require('fs').promises; 

const BASE_URL = 'https://prod-api.pinai.tech';

async function getToken() {
    try {
        const token = await fs.readFile('token.txt', 'utf8');
        return `Bearer ${token.trim()}`;
    } catch (e) {
        console.error('❌ Error reading token.txt:', e.message);
        process.exit(1); 
    }
}

let headers = {
    'accept': 'application/json',
    'accept-language': 'en-US,en;q=0.9',
    'lang': 'en-US',
    'content-type': 'application/json',
    'sec-ch-ua': '"Chromium";v="133", "Microsoft Edge WebView2";v="133", "Not(A:Brand";v="99", "Microsoft Edge";v="133"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'Referer': 'https://web.pinai.tech/',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const banner = `
=====================================
  Hi Pin Auto Bot - AirdropInsiders 
=====================================
`;

async function checkHome() {
    try {
        const res = await axios.get(`${BASE_URL}/home`, { headers });
        const data = res.data;

        console.log('===== Profile Info =====');
        console.log(`👤 Name: ${data.user_info?.name || 'N/A'}`);
        console.log(`✅ Today Check-in: ${data.is_today_checkin ? 'Yes' : 'No'}`);
        console.log(`📊 Current Level: ${data.current_model?.current_level || 'N/A'}`);
        console.log(`⬆️ Next Level Points: ${data.current_model?.next_level_need_point || 'N/A'}`);
        console.log(`⚡ Next Level Power: ${data.current_model?.next_level_add_power || 'N/A'}`);
        console.log(`🔋 Data Power: ${data.data_power || 'N/A'}`);
        console.log(`💎 Pin Points (Number): ${data.pin_points_in_number || 'N/A'}`);
        console.log(`📍 Pin Points: ${data.pin_points || 'N/A'}`);

        return data;
    } catch (e) {
        console.error('===== Profile Info =====');
        console.error('🏠 Home: Failed to fetch data');
        return null;
    }
}

async function getRandomTasks() {
    try {
        const res = await axios.get(`${BASE_URL}/task/random_task_list`, { headers });
        console.log('===== Task Info =====');
        console.log('📋 Tasks fetched');
        return res.data;
    } catch (e) {
        console.error('===== Task Info =====');
        console.error('📋 Tasks: Failed');
        return null;
    }
}

async function claimTask(taskId) {
    try {
        const res = await axios.post(`${BASE_URL}/task/${taskId}/claim`, {}, { headers });
        console.log(`✅ Task ${taskId}: Claimed`);
        return res.data;
    } catch (e) {
        console.error(`❌ Task ${taskId}: Failed`);
        return null;
    }
}

async function collectResources(type, count = 1) {
    try {
        const body = [{ type, count }];
        const res = await axios.post(`${BASE_URL}/home/collect`, body, { headers });
        console.log(`💰 ${type}: Collected`);
        return res.data;
    } catch (e) {
        console.error(`💰 ${type}: Failed`);
        return null;
    }
}

async function runBot() {
    console.log(banner); 
    while (true) {
        console.log('\n🚀 Starting new cycle...');

        await checkHome();
        console.log(''); 

        const tasks = await getRandomTasks();
        if (tasks?.data?.length) {
            console.log(`📋 Found ${tasks.data.length} tasks`);
            for (const task of tasks.data) {
                if (task.id) {
                    await claimTask(task.id);
                    await delay(1000);
                }
            }
        } else {
            console.log('📋 No tasks available');
        }
        console.log(''); 

        console.log('===== Collect Info =====');
        await collectResources('Twitter');
        await delay(2000);
        
        await collectResources('Google');
        await delay(2000);
        
        await collectResources('Telegram');
        await delay(2000);

        console.log(''); 
        console.log('===== End of Cycle =====');
        console.log('✅ Cycle complete! Waiting 10 secs...');
        await delay(10 * 1000); // 10 seconds delay between cycles
    }
}

async function start() {
    const token = await getToken();
    headers.authorization = token;

    try {
        await runBot();
    } catch (e) {
        console.error('💥 Bot crashed:', e.message);
        console.log('🔄 Restarting in 5 seconds...');
        await delay(5000);
        start();
    }
}

process.on('unhandledRejection', (e) => console.error('⚠️ Unhandled Rejection:', e.message));
process.on('uncaughtException', (e) => console.error('⚠️ Uncaught Exception:', e.message));

start();