## Install Backend
1. Buka folder backend-blog
```bash
cd backend-blog
```

2. copy env
``` bash
copy .env.example .env
```

3. jalankan composer install
```bash
composer install
```

4. jalankan migrasi beserta seeder nya
```bash
php artisan migrate --seed
```

5. jalankan aplikasi
```bash
php artisan serve
```

## Install Frontend
1. Buka folder frontend-blog
```bash
cd frontend-blog
```

2. Install NPM
```bash
npm install
```

3. Run Aplikasi
```bash
npm run dev
```