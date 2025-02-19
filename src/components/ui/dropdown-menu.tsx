import { Button } from "@/components/ui/button";
import {
  DropdownMenu as DropdownMenuBase,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu-base";
import { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";
import React, {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";

interface IDropdownMenuProps {
  menuTriggerElement: ReactNode;
  menuContent: {
    label?: string;
    menuGroup: IMenuItem[];
  };
}

interface IMenuItem {
  item: DropdownMenuItemProps;
  subItem?: {
    subItemTriggerElement: ReactNode;
    items: DropdownMenuItemProps[];
  };
}

const DropdownMenu: React.FC<IDropdownMenuProps> = ({
  menuContent,
  menuTriggerElement,
}) => {
  return (
    <DropdownMenuBase>
      <DropdownMenuTrigger asChild>{menuTriggerElement}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {menuContent.label && (
          <>
            <DropdownMenuLabel>{menuContent.label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {menuContent.menuGroup.map((menuItem, index) => (
          <React.Fragment key={"group-" + index}>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <DropdownMenuItem {...menuItem.item} />
              </DropdownMenuItem>
              {menuItem.subItem && (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {menuItem.subItem.subItemTriggerElement}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {menuItem.subItem.items.map((menuSubItem, index) => (
                        <DropdownMenuItem
                          key={"subGroup-" + index}
                          {...menuSubItem}
                        />
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              )}
            </DropdownMenuGroup>
            {index !== menuContent.menuGroup.length - 1 && (
              <DropdownMenuSeparator />
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenuBase>
  );
};

export default DropdownMenu;