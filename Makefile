build:
	docker compose build

start:
	docker compose up -d

stop:
	docker compose stop

shell:
	docker compose exec frontend bash
