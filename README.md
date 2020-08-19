# Run it locally

composer install
cp .env.example .env
configurar .env
php artisan migrate
php artisan serve

# http://localhost:8000/graphql-playground
