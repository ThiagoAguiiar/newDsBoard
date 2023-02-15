import { useUserContext } from "../../Context/UserContext";
import { BiExit } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import styles from "./Profile.module.scss";

const Profile = () => {
  const { logoutUser, data } = useUserContext();

  if (!data) return null;
  return (
    <div className={`${styles.container} row`}>
      <div className={`${styles.data} col-12`}>
        <div className={`${styles.button}`}>
          <button>
            <AiOutlineUser />
          </button>
        </div>
        <div className={`${styles.button} ${styles.exit}`}>
          <button onClick={logoutUser}>
            <BiExit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
