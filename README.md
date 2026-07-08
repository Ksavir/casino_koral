# Casino Koral 🪸

A modern casino-inspired game discovery platform built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

Designed as the solution for The Multiple Junior Full Stack Developer Technical Assessment.

## Preview

Hero Section
![HeroSection](src/public/images/Captura%20de%20pantalla%202026-07-07%20a%20la(s)%2011.44.05 p.m..png)

Game Slider
![Game Sliders](src/public/images/Captura%20de%20pantalla%202026-07-07%20a%20la(s)%2011.46.38 p.m..png)

Game Page
![Game page](src/public/images/Captura%20de%20pantalla%202026-07-07%20a%20la(s)%2011.47.20 p.m..png)

Favorites Games
![Favorite Games](src/public/images/Captura%20de%20pantalla%202026-07-07%20a%20la(s)%2011.48.16 p.m..png)

## Features

You will find: 

### Casino Lobby

- Hero banner
- Genre sliders
- Responsive layout

### Discovery

- Search by title
- Filters by genre
- Sorting by relevance, publisher, title, release date

### Personalization

- Favorites : You can add your favorites, interesting games, and remove when you don't like it anymore
- Recently viewed : To help you see which games you’ve viewed, in a simple way

### UX

- Skeleton loading
- Empty states
- Error handling

## Folder structure

```text

src/

├── app/          # Next.js App Router (pages, layouts, routes)

├── components/   # Reusable UI components

├── hooks/        # Custom React hooks

├── lib/          #  API helpers, tests

└── types/        # Global TypeScript types

```

## Future Improvements

- Pagination
- Docker

## Instalation

Please clone this repository in your computer.

Run the following commands:

```text
npm i or npm install
npm run dev
```

Port 3000 will be enabled for the viewing of the project - localhost:3000

## Short Questions

### 1. REST vs GraphQL - What is the difference between REST and GraphQL

REST and GraphQL are two different ways for a frontend to communicate with a backend.

With **REST**, the backend provides multiple endpoints, and each endpoint returns a fixed set of data.

With **GraphQL**, there is usually a single endpoint where the frontend specifies exactly which fields it wants. This reduces unnecessary data

### 2. RabbitMQ - What is RabbitMQ used for? Give one practical example.

RabbitMQ is a message broker that allows different applications or services to communicate asynchronously. Instead of waiting for one service to finish a task, RabbitMQ stores messages in a queue so they can be processed later. This helps make applications more reliable and scalable.

**Practical example:**

After a user registers, the application can immediately show a success message while RabbitMQ handles sending the welcome email in the background.

#### 3. SQL vs NoSQL - What are the main differences between SQL and NoSQL databases?

SQL databases store data in tables, are a good choice when data has clear relationships and consistency is important. 

NoSQL databases store data in more flexible formats, such as documents or key-value pairs. They are useful when the data structure changes frequently or when applications need to scale easily.

### 4. TypeScript - What are the benefits of using TypeScript compared to JavaScript?

TypeScript is like JavaScript with an extra layer of safety. It helps catch mistakes while I'm writing the code instead of finding them later when the application is running.

I also like that it gives better autocomplete and makes the code easier to understand, especially as the project grows. In my experience, using TypeScript has helped me make fewer mistakes and feel more confident when adding new features.


# Author : Kevin Rivas



### To: The Multiple Team

Thank you very much for taking the time to review my submission and for giving me the opportunity to complete this technical assessment. I genuinely enjoyed working on this project, I hope you enjoy reviewing it as much as I enjoyed building it.

