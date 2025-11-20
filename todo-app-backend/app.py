from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permitir CORS para React

# Lista de tareas
tasks = []

# Obtener todas las tareas
@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

# Agregar nueva tarea
@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    task = {"id": len(tasks) + 1, "title": data['title'], "done": False}
    tasks.append(task)
    return jsonify(task), 201

# Actualizar estado de tarea (hecho/no hecho)
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    for task in tasks:
        if task['id'] == task_id:
            task['done'] = not task['done']
            return jsonify(task)
    return jsonify({"error": "Task not found"}), 404

# Eliminar tarea
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({"message": "Task deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
