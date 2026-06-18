import {
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiMoreVertical,
  FiPlus,
  FiSearch,
  FiShuffle,
} from "react-icons/fi";

function Badge(props) {
  const styles = {
    Work: "bg-blue-100 text-blue-600",
    Health: "bg-indigo-100 text-indigo-600",
    High: "bg-red-100 text-red-500",
    Mid: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
    School: "bg-purple-100 text-purple-600"
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

function TaskRow(props) {
  const { task } = props;

  return (
    <label className="grid cursor-pointer grid-cols-[1fr_150px_130px_110px] items-center gap-4 rounded-lg px-4 py-3 text-sm transition hover:bg-slate-50 max-md:grid-cols-1 max-md:gap-2 max-md:rounded-xl max-md:border max-md:border-slate-100 max-md:bg-white">
      <div className="flex items-center gap-3">
        <input type="checkbox" className="peer hidden" />

        <span className="flex h-5 w-5 items-center justify-center rounded border border-slate-200 bg-white text-white transition peer-checked:border-blue-600 peer-checked:bg-blue-600">
          <FiCheck size={14} strokeWidth={3} />
        </span>

        <p className="font-semibold text-slate-700 peer-checked:text-slate-400 peer-checked:line-through">
          {task.title}
        </p>
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
    </label>
  );
}

function TaskSection(props) {
  const { group } = props

  return (
    <section className="rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
        <div className="flex items-center gap-2">
          <FiChevronDown className="text-slate-700" />
          <h2 className="font-bold text-slate-800">{group.title}</h2>
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
          <TaskRow key={task.title} task={task} />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const taskGroups = [
    {
      title: "To Do",
      tasks: [
        {
          title: "Website Development",
          dueDate: "Nov 17",
          tag: "Work",
          priority: "High",
        },
        {
          title: "Update Contact Form",
          dueDate: "Nov 18",
          tag: "Work",
          priority: "Mid",
        },
        {
          title: "Learning React JS",
          dueDate: "Nov 18",
          tag: "School",
          priority: "Mid",
        },
      ],
    },
    {
      title: "In Progress",
      tasks: [
        {
          title: "Do back exercises",
          dueDate: "Nov 17",
          tag: "Health",
          priority: "Mid",
        },
        {
          title: "Integrate Payment Gateway",
          dueDate: "Nov 17",
          tag: "Work",
          priority: "Low",
        },
      ],
    },
    {
      title: "Done",
      tasks: [
        {
          title: "Visit a dermatologist",
          dueDate: "Nov 17",
          tag: "Health",
          priority: "High",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      {/* Topbar */}
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

      {/* Content */}
      <section className="mx-auto max-w-6xl px-8 py-6 max-md:px-4">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4 max-md:flex-col max-md:items-start">
            <h1 className="text-2xl font-bold text-slate-900">My Tasks</h1>

            <div className="flex items-center gap-3">
              <div className="flex rounded-lg bg-slate-100 p-1">
                <button className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm">
                  List
                </button>
                <button className="rounded-md px-6 py-2 text-sm font-semibold text-slate-500">
                  Board
                </button>
              </div>

              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-blue-600">
                <FiShuffle />
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {taskGroups.map((group) => (
              <TaskSection key={group.title} group={group} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}