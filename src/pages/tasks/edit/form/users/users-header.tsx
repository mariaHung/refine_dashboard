import { Space, Typography } from "antd";

import { Task } from "@/graphql/schema.types";
import { UserTag } from "@/components/tags";

type Props = {
  users?: Task["users"];
};

export const UsersHeader = ({ users = [] }: Props) => {
  if (users.length > 0) {
    return (
      <Space size={[0, 8]} wrap>
        {users.map((user) => (
          <UserTag key={user.id} user={user} />
        ))}
      </Space>
    );
  }

  return <Typography.Link>Assign to users</Typography.Link>;
};
