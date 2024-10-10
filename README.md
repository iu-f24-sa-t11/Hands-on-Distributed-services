# Hands-on-Distributed-services

## Team 11
| Full name       | Group     | Email                           |
|-----------------|-----------|---------------------------------|
| Azamat Bayramov | B22-SD-03 | a.bayramov@innopolis.university |
| Darya Koncheva  | B22-SD-02 | d.koncheva@innopolis.university |
| Matthew Rusakov | B22-SD-03 | m.rusakov@innopolis.university  |
| Egor Valikov    | B22-CBS-01| e.valikov@innopolis.university  |

## Application:

**Blue Cactus** is a Twitter-like system where users can post short messages (<400 characters), read them, and like them. Users must be registered to post messages, with registered users having a username and nothing else (not even a password). Messages can be read by anyone as a feed, displaying the last 10 messages. The application is built using a service-based pattern from [FOSA], with services separated based on business context.

#### Screenshot:

[-](https://github.com/iu-f24-sa-t11/Hands-on-Distributed-services/static/screenshot)

## Codebase organisation:

## Setup Instructions

##### 1. Clone repository
```
git clone https://github.com/iu-f24-sa-t11/Hands-on-Distributed-services.git
```

##### 2. Create .env file like in .env.sample
```
DOMAIN=<your domain>
```

##### 3.1 Make sure you have insall requirements
```
chmod +x requirements.sh
sudo ./requirements.sh
```

##### 3.2 Start application
```
docker-compose up --build
```

## Link to YouTube video:
