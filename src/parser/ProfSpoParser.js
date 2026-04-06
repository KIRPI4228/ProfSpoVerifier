import Parser from "./Parser.js";
import Resources from "../Resources.js";

const getTasksUrl = Resources.GET_TASKS_HTML_URL;

const taskButtonClassName = Resources.TASK_BUTTON_CLASS_NAME;

const taskButtonExcludeClassName = Resources.TASK_BUTTON_EXCLUDE_CLASS_NAME;

export default class ProfSpoParser extends Parser {
    constructor(sessionId) {
        super(sessionId);
    }

    getUncommitedTasksHrefs = async () => {
        return this.#getTasksHrefs(this.#getUncommitedTasks(await this.#getTasksButtons()));
    }

    #getTasksHrefs = (tasks) => {
        return tasks.map(task => task.getElement().href);
    }

    #getUncommitedTasks = (buttons) => {
        return buttons.filter(this.#isTaskUncommited);
    }

    #getTasksButtons = async () => {
        const html = await this.getHtml(getTasksUrl);
        return html.getItemsByClassName(taskButtonClassName);
    }

    #isTaskUncommited = (task) => {
        return !task.getElement().classList.contains(taskButtonExcludeClassName);
    }
}