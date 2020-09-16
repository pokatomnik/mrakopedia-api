import { Element } from '../preact/preact.mjs';

interface ICheckInviteProps {
  children: (inviteId) => Element;
}

export function CheckInvite(props: ICheckInviteProps): Element;
