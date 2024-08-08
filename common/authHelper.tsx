export const redirectAsPerContext = (isSignedIn: any = {}) => {
  if (isSignedIn) {
    return "/dashboard";
  }
  return "/";
};
