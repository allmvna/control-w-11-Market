import { AppBar, styled, Toolbar, Typography } from "@mui/material";
import { Link as NavLink } from "react-router-dom";

import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";
import Container from "@mui/material/Container";
import { useAppSelector } from "../../app/hooks.ts";
import {selectUser} from "../../features/users/userSlice.ts";

const Logo = styled(NavLink)({
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "color 0.3s",
  "&:hover": {
    textDecoration: "underline",
  },
});

const BgAppBar = styled(AppBar)({
  background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <BgAppBar position="sticky" sx={{ mb: 2, p: 1 }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Logo to="/">Market</Logo>
          </Typography>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Toolbar>
      </Container>
    </BgAppBar>
  );
};

export default AppToolbar;
