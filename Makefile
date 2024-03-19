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

component_test:
	docker compose exec frontend yarn test

e2e_test:
	docker run -it -v ${PWD}/frontend:/e2e -w /e2e --network=host cypress/included:13.7.0

test: component_test e2e_test

shell:
	docker compose exec frontend bash
