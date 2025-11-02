export type PullRequest = {
  base: {
    repo: {
      full_name: string;
      name: string;
      owner: {
        login: string;
      };
    };
  };
  labels: {
    name: string;
  }[];
  number: number;
  state: string;
  title: string;
  user: {
    login: string;
    type: string;
  } | null;
};

export type Repository = {
  archived?: boolean;
  fork: boolean;
  full_name: string;
  name: string;
  owner: {
    login: string;
  };
};
