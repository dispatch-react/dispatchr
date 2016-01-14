import OverlayViewCreator from 'react-google-maps/lib/creators/OverlayViewCreator';
const oldCreateOverlayView = OverlayViewCreator._createOverlayView;

OverlayViewCreator._createOverlayView = function(overlayViewProps) {
    const overlayView = oldCreateOverlayView(overlayViewProps);

    if (overlayViewProps.anchorHolderRef) {
        if ('MarkerClusterer' === overlayViewProps.anchorHolderRef.getAnchorType()) {
            overlayView.getDraggable = () => false;
            overlayView.getPosition = function() {return new google.maps.LatLng(this.position)};
            overlayViewProps.anchorHolderRef.getAnchor().addMarker(overlayView);
        }
    }

    return overlayView;
};