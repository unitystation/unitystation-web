import Capsule from '../../app/common/uiLibrary/capsule';

// The parent must be positioned (`relative`) for the absolute corner placement.
function CornerBadge({ text }: { text: string }) {
  return (
    <span className="absolute -top-2 right-2 normal-case">
      <Capsule text={text} colour="blue" />
    </span>
  );
}

export default CornerBadge;
