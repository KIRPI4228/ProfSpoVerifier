export default class Resources {
    static GET_TASKS_HTML_URL = 'https://profspo.ru/tasks?_url=/tasks';
    static POST_LOGIN_URL = 'https://profspo.ru/auth/login';
    static BASE_URL = 'https://profspo.ru';

    static TASK_BUTTON_CLASS_NAME = 'btn btn-outline-info btn-sm';
    static TASK_BUTTON_EXCLUDE_CLASS_NAME = 'disabled';

    static NOT_AUTHORIZED_ERROR = 'Request failed with status code 401';
    static CREATE_SECOND_SINGLETON_ERROR = 'It is impossible to create already existing singleton class'

    static AUTHORIZATION_EMAIL = process.env.PROFSPOVERIFIER_AUTH_EMAIL;
    static AUTHORIZATION_PASSWORD = process.env.PROFSPOVERIFIER_AUTH_PASSWORD;

    static DO_TRACE_LOGGING = process.env.PROFSPOVERIFIER_LOGGING_DO_TRACE === "true" ?? true;
    static IS_PING_ACTIVE = process.env.PROFSPOVERIFIER_PING_ACTIVE === "true" ?? true;
    static PING_INTERVAL = process.env.PROFSPOVERIFIER_PING_INTERVAL ?? 12;
}