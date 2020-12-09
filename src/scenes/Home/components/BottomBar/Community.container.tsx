import React from 'react';

import Button from '@components/Button/Button';
import { useStoreState } from '@store/Store';

// type CommunityIconProps = { borderColor?: string; logoUrl: string };

// const CommunityIcon = ({ borderColor, logoUrl }: CommunityIconProps) => {
//   const customStyle = { border: `2px ${borderColor ?? '#000'} solid` };

//   return (
//     <button className="s-home-sidebar-community" style={customStyle}>
//       <img src={logoUrl} />
//     </button>
//   );
// };

export default () => {
  const logoUrl = useStoreState(({ community }) => community.logoUrl);

  return (
    <Button className="s-home-bb-link--community">
      <img src={logoUrl} />
    </Button>
    // <div className="s-home-sidebar-community-ctr">
    //   {allIds?.map((communityId: string) => (
    //     <CommunityIcon
    //       key={communityId}
    //       borderColor={
    //         activeId === communityId && byId[communityId].primaryColor
    //       }
    //       logoUrl={byId[communityId]?.logoUrl}
    //     />
    //   ))}
    // </div>
  );
};
