
# ABS Live Chat 💬

*A real-time chat application built with Django, Channels, and Tailwind CSS.*

## 🚀 Overview

**ABS Live Chat** is a real-time web chat application inspired by **Code With Stein**.
It uses **Django Channels** and **WebSockets** to enable instant messaging, with **Tailwind CSS** for a clean and responsive UI.

## 🛠 Tech Stack

* **Backend:** Django 4.2, Django Channels 4.0
* **WebSockets:** Daphne, Twisted, Autobahn
* **Frontend:** Tailwind CSS
* **Security & Networking:** OpenSSL, Cryptography
* **Deployment:** Gunicorn

## 📦 Key Dependencies

This project relies on:

* `Django`, `channels`, `daphne`
* `Twisted`, `autobahn`, `txaio`
* `cryptography`, `pyOpenSSL`
* `gunicorn`
* `asgiref`, `sqlparse`, and related utilities

(See `requirements.txt` for the full list.)

## ✨ Features

* Real-time messaging using WebSockets
* Modern UI with Tailwind CSS
* Scalable async architecture with Django Channels
* Production-ready ASGI setup

## ⚙️ Setup (Quick Start)

```bash
git clone https://github.com/ChristianByabushi/livechat
cd abs-live-chat
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

MIT License — feel free to use, modify, and improve.

---

### ABS Project inspired from Code With Stein# project
