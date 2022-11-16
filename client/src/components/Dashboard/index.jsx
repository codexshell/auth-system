import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("username")) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h2>Howdy, David</h2>
      <button className="signOutBtn" onClick={handleSignOut}>
        SIGN OUT
      </button>
    </div>
  );
};

export default Dashboard;
