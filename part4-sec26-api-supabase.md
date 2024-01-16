# Packages Install

```bash
npm install --save @supabase/supabase-js

```

# Section Topics

-   Plan application data
-   Model relationships between data tables
-   Load data into the app via Supabase API

# What is Supabase?

-   Service that allows developers to easily create a back-end with a Postgres database.
-   Automatically creates a database and API so we can easily request and receive data from the server.
-   No back-end development needed.
-   Perfect to get up and running quickly!
-   Not just an API: Supabase also comes with easy-to-use user authentication and file storage.

# Modeling State In Our Project To Tables

### State "Domains" / "Slices"

1. Bookings => Features [Bookings, Dashboard, Check in and out]
2. Cabins => Features [Cabins, ]
3. Guests => Features [Guests, ]
4. Settings => Features [App Settings, ]
5. Users => Features [Authentication, ]

-   All this state will be global remote state, stored within Supabase.
-   There will be one table for each state "slice" in the database.
-   Manage global remote state using supabase and React Query.
