import Parser from "./Parser";
import Resources from "../Resources";

const getTasksUrl = Resources.GET_TASKS_HTML_URL;

const taskButtonQuery = Resources.TASK_BUTTON_QUERY_SELECTOR;
const taskCardQuery = Resources.TASK_CARD_QUERY_SELECTOR;

const taskButtonExcludeClassName = Resources.TASK_BUTTON_EXCLUDE_CLASS_NAME;

export default class ProfSpoParser extends Parser {
    constructor(sessionId) {
        super(sessionId);
        console.log(this.#getTasksHrefs(this.#getUncommitedTasks(this.#getTasksCards())));
    }

    #getTasksHrefs(tasks) {
        return tasks.map(task => this.#getTaskButton(task).getElement().href);
    }

    #getUncommitedTasks(cards) {
        return cards.filter(this.#isTaskUncommited);
    }

    #getTasksCards() {
        return this.getHtml(getTasksUrl).getItemsByQuery(taskCardQuery);
    }

    #getTaskButton(task) {
        return task.getItemsByQuery(taskButtonQuery)[0];
    }

    #isTaskUncommited(task) {
        const buttons = this.#getTaskButton(task);
        return buttons.length > 0 && !buttons[0].getElement().classList.contains(taskButtonExcludeClassName);
    }
}