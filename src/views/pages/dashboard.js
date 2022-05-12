import MasterTable from "../modules/master_table"
import end_users from "../../database/end_users";

export default () => {
  return(
    <>
      <MasterTable data={end_users} />
    </>
  )
};
