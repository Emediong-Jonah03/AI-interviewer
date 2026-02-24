interface DashboardProps {
  isVisible: boolean;
  startInterview: () => void;
}

function Dashboard({ isVisible, startInterview }: DashboardProps) {
  if (!isVisible) return null;

  return (
    <main className="flex items-center justify-center p-4 mb-8">
      <div className="max-w-md w-full bg-surface rounded-2xl shadow-2xl p-8 text-center">

        {/* Neutral Interview Avatar */}
        <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white">
          AI
        </div>

        <h1 className="text-2xl font-bold text-text mb-3">
          Technical Interview Simulator
        </h1>

        <p className="text-text-muted leading-relaxed mb-8">
          You’ll be asked real technical questions similar to what you’d face in
          an actual interview. Take your time, explain your thinking, and respond
          as clearly as you can.
        </p>

        <button
          onClick={startInterview}
          className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
          aria-label="Begin technical interview"
        >
          Begin Interview
        </button>
      </div>
    </main>
  );
}

export default Dashboard;
