import { PersonController } from "./controllers/PersonController";

const controller = new PersonController();

controller.loadStates();
controller.loadCities();
controller.savePerson();