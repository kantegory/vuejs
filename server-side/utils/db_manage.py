from .db import Users, Tasks, Tags, session
import datetime
import json
import numpy as np


def add_user(data):
    s = session()
    rows = s.query(Users).all()
    check = []

    for row in rows:
        check.append(row.email)
    
    for curr_row in data:
        if str(curr_row["email"]) not in check:
            users = Users(
                email=curr_row["email"],
                password=curr_row["password"]
            )
            s.add(users)
    
    s.commit()


def add_task(data):
    s = session()

    s.add(
        Tasks(
            title = data["title"],
            description = data["description"],
            whatWatch = data["whatWatch"],
            time = data["time"],
            tags = data["tags"],
            completed = data["completed"],
            editing = data["editing"],
            user_id = data["user_id"]
        )
    )

    s.commit()


def add_tag(data):
    s = session()

    s.add(
        Tags(
            title = data['title']
        )
    )

    s.commit()


def user_auth(data):
    s = session()
    
    rows = s.query(Users).filter(Users.email == data["email"] and Users.password == data["password"]).all()
    auth = True if rows else False

    return auth


def select_tasks_by_user(data):
    s = session()

    rows = s.query(Tasks).filter(Tasks.user_id == data["user_id"]).all()

    result = [
        {
            "id": rows[i].id,
            "title": rows[i].title,
            "description": rows[i].description,
            "whatWatch": rows[i].whatWatch,
            "time": rows[i].time,
            "tags": rows[i].tags,
            "completed": rows[i].completed,
            "editing": rows[i].editing,
            "user_id": rows[i].user_id
        }
        for i in range(len(rows))
    ]

    return json.dumps(result)


def select_tags():
    s = session()

    rows = s.query(Tags).all()

    result = [
        {
            "title": rows[i].title
        }
        for i in range(len(rows))
    ]

    return json.dumps(result)


def update_task(data):
    s = session()

    s.query(Tasks).filter(Task.id == data["id"]).update(
        {
            "title": data["title"],
            "description": data["description"],
            "whatWatch": data["whatWatch"],
            "time": data["time"],
            "completed": data["completed"],
            "editing": data["editing"],
            "tags": data["tags"]
        }
    )

    s.commit()
