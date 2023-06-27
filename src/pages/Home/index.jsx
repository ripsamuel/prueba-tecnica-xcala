import { NavLink } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import Button from "../../components/Button";

export default function Home() {
return (
  <>

      <AppLayout>
        <Button>
            <NavLink to="./orders"> Ver Ordenes
            </NavLink>
        </Button>
      </AppLayout>
    </>
    )
}