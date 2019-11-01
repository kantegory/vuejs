import bottle
from bottle import request, route, template, static_file
from utils.db_manage import add_user, add_task, add_tag, user_auth, update_task, select_tasks_by_user
import json

app = bottle.app()


@route('/register', method='POST')
def register():
    data = request.params
    add_user(data)


@route('/auth', method='POST')
def auth():
    pass


@route('/new_task', method='GET')
def new_task():
    data = request.params
    add_task(data)


@route('/new_tag', method='GET')
def new_tag():
    data = request.params
    add_tag(data)


@route('/update_task', method='GET')
def edit_task():
    data = request.params
    update_task(data)


@route('/get_tasks', method='GET')
def get_tasks():
    data = request.params
    select_tasks_by_user(data)


def main():
    bottle.run(app=app, port=8090)


if __name__ == '__main__':
    main()
