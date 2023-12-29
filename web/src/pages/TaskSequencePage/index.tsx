import swal from "sweetalert";

import { useMenuOptions } from "@/hooks/useMenuOptions";
import Button from "@/components/Button";
import SideBar from "@/components/SideBar";

import { useModule } from "./module";

const TaskSequencePage: React.FC = () => {
  const { menuOptions } = useMenuOptions();
  const {
    requests,
    sanitizeTaskType,
    sanitizeDate,
    generateSequence,
    sequence,
  } = useModule();

  const handleGeneratePath = () => {
    swal({
      title: "Are you sure?",
      text: "Once generated, the tasks will be executed in the order of the sequence.",
      icon: "warning",
      buttons: ["Cancel", "Generate"],
      dangerMode: true,
    }).then((willGenerate) => {
      if (willGenerate) {
        generateSequence();
        swal("Task Sequence generated!", {
          icon: "success",
          timer: 2000,
        });
      } else {
        swal({
          title: "Task Sequence not generated!",
          icon: "info",
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="flex">
      <SideBar menuOptions={menuOptions} />
      <main className="mt-12 flex h-full w-full flex-col gap-y-4 pl-12">
        <h1 className="text-4xl font-bold">Task Sequence</h1>
        <p className="text-slate-500">
          Check the task sequence for all the approved task requests.
        </p>
        <section className="my-8 flex flex-wrap items-center justify-around gap-x-8">
          {requests.map((request) => (
            <article
              className="relative flex w-full max-w-[320px] select-none flex-col rounded-lg border border-slate-200 px-12 py-8 hover:brightness-90"
              key={request.id}
            >
              <h2 className="text-2xl font-bold">
                {request.user.firstName} {request.user.lastName}
              </h2>
              <span className="absolute right-2 top-2 text-slate-600">
                {sanitizeDate(request.requestedAt)}
              </span>
              <h2 className="text-base">
                Type: {sanitizeTaskType(request.type)}
              </h2>
              <p className="mt-4 text-sm text-slate-600">
                Details: {request.description}
              </p>
            </article>
          ))}
        </section>
        <div className="flex w-full items-center justify-center">
          <Button name="generate" type="confirm" onClick={handleGeneratePath}>
            Generate Task Sequence
          </Button>
        </div>
        {sequence && (
          <section className="flex w-full items-center gap-y-4">
            {sequence.map((request, i) => (
              <article
                key={request.id}
                className="flex h-24 w-full items-center rounded-lg bg-slate-400"
              >
                <h2 className="text-3xl font-bold">#{i + 1}</h2>
                <div className="flex flex-col items-center">
                  <span>
                    {request.user.firstName} {request.user.lastName}
                  </span>
                  <p className="mt-4 text-sm text-slate-600">
                    Details: {request.description}
                  </p>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default TaskSequencePage;
