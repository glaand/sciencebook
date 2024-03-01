build:
	docker compose build

start:
	docker compose up -d

stop:
	docker compose stop

down:
	docker compose down -v

logs:
	docker compose logs -f

shell:
	docker compose exec frontend bash
