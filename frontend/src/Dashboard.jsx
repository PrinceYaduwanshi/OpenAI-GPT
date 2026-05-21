import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { FiMessageCircle, FiLayers, FiFeather, FiZap } from "react-icons/fi";

const features = [
    {
        icon: <FiMessageCircle size={22} />,
        title: "Ask anything, really",
        desc: "From quick facts to long explanations — just type what's on your mind and get a thoughtful answer.",
    },
    {
        icon: <FiLayers size={22} />,
        title: "Your chats, always there",
        desc: "Every thread is saved automatically. Come back tomorrow and it'll be right where you left it.",
    },
    {
        icon: <FiFeather size={22} />,
        title: "Feels like a conversation",
        desc: "Responses appear word by word, like someone actually typing back to you. No walls of text.",
    },
];

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashPage">

            {/* ── Nav ─────────────────────── */}
            <nav className="dashNav">
                <span className="dashBrand">GPT</span>
                <button className="navLoginBtn" onClick={() => navigate("/login")}>
                    Log in
                </button>
            </nav>

            {/* ── Hero ────────────────────── */}
            <section className="dashHero">

                <p className="heroEyebrow"><FiZap size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} />A project built with curiosity</p>

                <h1 className="heroTitle">
                    Meet your new<br />
                    thinking partner.
                </h1>

                <p className="heroSub">
                    A personal AI assistant built from scratch using the OpenAI APIs.
                    Ask it anything — it listens, it remembers, and it keeps up with you
                    across every conversation.
                </p>

                <button className="ctaBtn" onClick={() => navigate("/login")}>
                    Test it out &nbsp;→
                </button>

                <p className="ctaNote">No setup needed. Just start chatting.</p>

            </section>

            {/* ── Features ────────────────── */}
            <section className="dashFeatures">
                {features.map((f) => (
                    <div className="featureItem" key={f.title}>
                        <span className="featureIcon">{f.icon}</span>
                        <div>
                            <h3 className="featureTitle">{f.title}</h3>
                            <p className="featureDesc">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* ── Footer ──────────────────── */}
            <footer className="dashFooter">
                Made with React &amp; Node.js &nbsp;·&nbsp; OpenAI under the hood
            </footer>

        </div>
    );

}

export default Dashboard;
