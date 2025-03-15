# HiPin Auto Bot

> Automated bot for HiPin platform tasks and resource collection

## 📋 Features

- Automatyczne meldowanie się codziennie
- Gromadzi zasoby z Twittera, Google i Telegrama
- Roszczenia dotyczące losowych zadań
- Ciągła praca z obsługą błędów
- Szczegółowe rejestrowanie konsoli

## 🚀 Instalacja

1. Clone the repository:
```bash
git clone https://github.com/pazdzioch78/HiPin-Auto-Bot.git
cd HiPin-Auto-Bot
```

2. Install dependencies:
```bash
npm install
```

3. Add your HiPin authentication token.txt  :
```bash
eyJ.....1
eyJ.....2
eyJ.....3
```

## 🔧 Usage

Run the bot:
```bash
npm start
```

The bot will continuously:
1. Check your profile information
2. Fetch and claim available tasks
3. Collect resources from Twitter, Google, and Telegram
4. Wait 10 seconds between cycles

## 🔑 How to Get Your Token

1. Log in to [HiPin](https://t.me/hi_PIN_bot/app?startapp=pAje4kn)
2. Open Developer Tools (F12 or Right-click > Inspect)
3. Go to the Network tab
4. Look for requests to the API (e.g., `/home`)
5. Find the `authorization` header in the request headers
6. Copy the token (without "Bearer ")
7. Paste it into the `token.txt` file

## 📊 Console Output

The bot provides detailed console output about:
- Profile information
- Current level and points
- Task claims
- Resource collection
- Error messages

## ⚠️ Disclaimer

This bot is for educational purposes only. Use at your own risk. The developers are not responsible for any consequences of using this bot, including but not limited to account bans or loss of rewards.

## 📄 License

MIT

## 👥 Contributors

- [AirdropInsiders]

## 🔗 Links

