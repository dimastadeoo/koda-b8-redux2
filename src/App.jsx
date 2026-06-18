import React from "react";
import {
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiMoreVertical,
  FiPlus,
  FiSearch,
  FiShuffle,
  FiX,
} from "react-icons/fi";


function normalizeGroups(data) {
  const groupTitles = ["To Do", "In Progress", "Done"];
  const groups = Array.isArray(data) ? data : [];

  return groupTitles.map((title) => {
    const existingGroup = groups.find((group) => group.title === title);

    return {
      title,
      tasks: Array.isArray(existingGroup?.tasks) ? existingGroup.tasks : [],
    };
  });
}

function getData(data) {
  const savedData = localStorage.getItem(data);

  if (savedData) {
    return normalizeGroups(JSON.parse(savedData));
  }
  return normalizeGroups([]);
}

function Badge(props) {
  const styles = {
    Work: "bg-blue-100 text-blue-600",
    Health: "bg-indigo-100 text-indigo-600",
    School: "bg-purple-100 text-purple-600",
    Personal: "bg-slate-100 text-slate-600",
    High: "bg-red-100 text-red-500",
    Mid: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${styles[props.type] || "bg-slate-100 text-slate-500"
        }`}
    >
      {props.type}
    </span>
  );
}

const FormInput = React.forwardRef(function FormInput(props, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  );
});

function TaskRow(props) {
  const { task, groupTitle, onMoveTask } = props;

  const isDone = groupTitle === "Done";

  return (
    <div className="grid grid-cols-[1fr_150px_130px_110px] items-center gap-4 rounded-lg px-4 py-3 text-sm transition hover:bg-slate-50 max-md:grid-cols-1 max-md:gap-2 max-md:rounded-xl max-md:border max-md:border-slate-100 max-md:bg-white">
      <div className="flex items-center gap-3">
        {!isDone && (
          <button
            type="button"
            onClick={() => onMoveTask(task.id, groupTitle)}
            className="flex h-5 w-5 items-center justify-center rounded border border-slate-200 bg-white text-white transition hover:border-blue-600 hover:bg-blue-600"
          >
            <FiCheck size={14} strokeWidth={3} />
          </button>
        )}

        <p className="font-semibold text-slate-700">{task.title}</p>
      </div>

      <div className="flex items-center gap-2 text-slate-500">
        <FiCalendar className="text-blue-500" />
        <span>{task.dueDate}</span>
      </div>

      <div>
        <Badge type={task.tag} />
      </div>

      <div>
        <Badge type={task.priority} />
      </div>
    </div>
  );
}

function TaskSection(props) {
  const { group, onMoveTask } = props;

  return (
    <section className="rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
        <div className="flex items-center gap-2">
          <FiChevronDown className="text-slate-700" />

          <h2 className="font-bold text-slate-800">{group.title}</h2>

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">
            {group.tasks.length}
          </span>
        </div>

        <button className="rounded-lg p-1 text-slate-500 hover:bg-slate-100">
          <FiMoreVertical />
        </button>
      </div>

      <div className="px-4 py-3 max-md:hidden">
        <div className="grid grid-cols-[1fr_150px_130px_110px] gap-4 text-sm font-medium text-slate-400">
          <p>Task</p>
          <p>Due Date</p>
          <p>Task Tags</p>
          <p>Priority</p>
        </div>
      </div>

      <div className="space-y-1 px-4 pb-4 max-md:space-y-3">
        {group.tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            groupTitle={group.title}
            onMoveTask={onMoveTask}
          />
        ))}

        {group.tasks.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-200 px-4 py-6 text-center text-sm font-semibold text-slate-400">
            No tasks here
          </div>
        )}
      </div>
    </section>
  );
}

function AddTaskModal(props) {
  const { isOpen, onClose, onAddTask } = props;

  const titleRef = React.useRef(null);
  const dueDateRef = React.useRef(null);
  const tagRef = React.useRef(null);
  const priorityRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        titleRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    const title = titleRef.current.value;
    const dueDate = dueDateRef.current.value;
    const tag = tagRef.current.value;
    const priority = priorityRef.current.value;

    if (!title.trim()) {
      titleRef.current.focus();
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      dueDate: dueDate.trim() || "No date",
      tag,
      priority,
    };

    onAddTask(newTask);

    titleRef.current.value = "";
    dueDateRef.current.value = "";
    tagRef.current.value = "Work";
    priorityRef.current.value = "Mid";

    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Add New Activity
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Aktivitas baru akan masuk ke bagian To Do.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              List Kegiatan
            </label>
            <FormInput
              ref={titleRef}
              type="text"
              placeholder="Contoh: Belajar React"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Due Date
            </label>
            <FormInput
              ref={dueDateRef}
              type="text"
              placeholder="Contoh: Nov 20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Task Tag
            </label>
            <select
              ref={tagRef}
              defaultValue="Work"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Work">Work</option>
              <option value="Health">Health</option>
              <option value="School">School</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Priority
            </label>
            <select
              ref={priorityRef}
              defaultValue="Mid"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="High">High</option>
              <option value="Mid">Mid</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <FiPlus />
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const keyLocal = "task-groups";
  const [taskGroups, setTaskGroups] = React.useState(getData(keyLocal))
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  React.useEffect(() => {
    localStorage.setItem(keyLocal, JSON.stringify(taskGroups));
  }, [taskGroups]);

  function handleAddTask(newTask) {
    setTaskGroups((prevGroups) =>
      normalizeGroups(prevGroups).map((group) => {
        if (group.title === "To Do") {
          return {
            ...group,
            tasks: [newTask, ...group.tasks],
          };
        }

        return group;
      })
    );
  }

  function handleMoveTask(taskId, currentGroupTitle) {
    let nextGroupTitle = "";

    if (currentGroupTitle === "To Do") {
      nextGroupTitle = "In Progress";
    }

    if (currentGroupTitle === "In Progress") {
      nextGroupTitle = "Done";
    }

    if (!nextGroupTitle) return;

    setTaskGroups((prevGroups) => {
      let movedTask = null;

      const removedGroups = normalizeGroups(prevGroups).map((group) => {
        if (group.title !== currentGroupTitle) {
          return group;
        }

        return {
          ...group,
          tasks: group.tasks.filter((task) => {
            if (task.id === taskId) {
              movedTask = task;
              return false;
            }

            return true;
          }),
        };
      });

      if (!movedTask) return prevGroups;

      return removedGroups.map((group) => {
        if (group.title === nextGroupTitle) {
          return {
            ...group,
            tasks: [...group.tasks, movedTask],
          };
        }

        return group;
      });
    });
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white px-8 py-4 max-md:px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex w-full max-w-sm items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
            <FiSearch className="text-slate-400" />
            <input
              type="text"
              placeholder="Search for tasks..."
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-slate-800">
                Alex Rodriguez
              </p>
              <p className="text-xs font-medium text-slate-400">
                @alexrd@gmail.com
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
              AR
            </div>

            <FiChevronDown className="text-slate-500" />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-8 py-6 max-md:px-4">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4 max-md:flex-col max-md:items-start">
            <h1 className="text-2xl font-bold text-slate-900">My Tasks</h1>

            <div className="flex items-center gap-3">
              <div className="flex rounded-lg bg-slate-100 p-1">
                <button className="cusrsor-pointer rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm">
                  List
                </button>

                <button className="cursor-pointer rounded-md px-6 py-2 text-sm font-semibold text-slate-500">
                  Board
                </button>
              </div>

              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-blue-600">
                <FiShuffle />
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {taskGroups.map((group) => (
              <TaskSection
                key={group.title}
                group={group}
                onMoveTask={handleMoveTask}
              />
            ))}
          </div>
        </div>
      </section>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </main>
  );
}