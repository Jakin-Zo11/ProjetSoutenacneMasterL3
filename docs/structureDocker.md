Docker Compose
│
├── app
│    └── Laravel / PHP
│
├── postgres
│    └── PostgreSQL
│
├── redis
│    └── Redis
│
├── worker
│    └── Laravel Queue
│
└── nginx
     └── Reverse Proxy



                        NGINX
                     │
                     ▼
                  Laravel
                /    │    \
               /     │     \
              ▼      ▼      ▼
         PostgreSQL Redis  Queue
                            │
                            ▼
                          Worker