export default class Resources {
    static GET_TASKS_HTML_URL = 'https://profspo.ru/tasks?_url=/tasks';
    static BASE_URL = 'https://profspo.ru';

    static TASK_BUTTON_CLASS_NAME = 'btn btn-outline-info btn-sm';
    static TASK_BUTTON_EXCLUDE_CLASS_NAME = 'disabled';

    static NOT_AUTHORIZED_ERROR = 'AxiosError: Request failed with status code 401';

    static SESSION_ID = process.env.SESSION_ID;
}