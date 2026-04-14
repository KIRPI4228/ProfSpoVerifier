import Parser from "./Parser.js";
import Logger from "../Logger.js";
import Resources from "../Resources.js";

const getTasksUrl = Resources.GET_TASKS_HTML_URL;

const taskButtonClassName = Resources.TASK_BUTTON_CLASS_NAME;

const taskButtonExcludeClassName = Resources.TASK_BUTTON_EXCLUDE_CLASS_NAME;

export default class ProfSpoParser extends Parser {
    getUncommitedTasksHrefs = async () => {
        Logger.log(`Getting uncommited tasks hrefs`);
        return this.#getTasksHrefs(this.#getUncommitedTasks(await this.#getTasksButtons()));
    }

    #getTasksHrefs = (tasks) => {
        Logger.log(`Converting html button to hrefs`);
        return tasks.map(task => task.getElement().href);
    }

    #getUncommitedTasks = (buttons) => {
        Logger.log(`Filtering tasks`);
        return buttons.filter(this.#isTaskUncommited);
    }

    #getTasksButtons = async () => {
        Logger.log(`Getting all tasks buttons`);
        const html = await this.getHtml(getTasksUrl);
        Logger.log(`Parsing buttons from html text`);
        return html.getItemsByClassName(taskButtonClassName);
    }

    #isTaskUncommited = (task) => {
        return !task.getElement().classList.contains(taskButtonExcludeClassName);
    }
}