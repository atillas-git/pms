import {
  ArchiveRestore,
  ArchiveX,
  School,
  User,
  Users,
  Home,
  Activity,
  BookMarked,
  BookUser,
} from "lucide-react";

type SidebarSubItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
  description?: string;
  children?: SidebarSubItem[];
};

type SidebarItem = {
  heading: string;
  elements: SidebarSubItem[];
};

type Sidebar = {
  items: SidebarItem[];
};

const modules: Sidebar = {
  items: [
    {
      heading: "Front Desk",
      elements: [
        {
          label: "CheckIN",
          icon: <ArchiveRestore />,
          description: "CheckIn module for easy,fast checkIns.",
          path: "/portal/checkin",
        },
        {
          label: "CheckOut",
          icon: <ArchiveX />,
          description: "CheckOut module for easy,fast checkOuts.",
          path: "/portal/checkout",
        },
        {
          label: "Room Rack",
          icon: <School />,
          path: "/portal/roomRack",
        },
        {
          label: "Reservations",
          icon: <BookMarked />,
          path: "/portal/reservations",
        },
      ],
    },
    {
      heading: "User Management",
      elements: [
        {
          label: "Employee Groups",
          icon: <User />,
          path: "/portal/userGroupManagement",
        },
        {
          label: "Guests",
          icon: <BookUser />,
          path: "/portal/guests",
        },
        {
          label: "Hr Management",
          icon: <Users />,
          path: "/portal/hr",
        },
      ],
    },
    {
      heading: "House Keeping",
      elements: [
        {
          label: "My Rooms",
          icon: <Home />,
          path: "/portal/hk/myRooms",
        },
        {
          label: "Performance Report",
          icon: <Activity />,
          path: "/portal/hk/performanceReport",
        },
      ],
    },
  ],
};

export default modules;
