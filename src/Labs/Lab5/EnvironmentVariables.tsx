const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER

export default function EnvironmentVariables() {
    return (
        <div id="wd-environment-variables">
            <h3>Environment Variables</h3>
            <p>Remote server: {REMOTE_SERVER}</p>
            <hr />
        </div>
    );
}