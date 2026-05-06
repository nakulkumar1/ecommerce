import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    const { darkMode = false, children } = this.props;

    if (!this.state.hasError) {
      return children;
    }

    return (
      <div className={`m-4 rounded border p-6 text-center ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Something went wrong</h2>
        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Please refresh the page or open another section from the menu.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Refresh
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
