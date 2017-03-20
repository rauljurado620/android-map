
/**
 * If the table view rows are too small on Android, add the following to your tiapp.xml
 * 
<android xmlns:android="http://schemas.android.com/apk/res/android">
    <manifest>
        <supports-screens android:anyDensity="false"/>
    </manifest>
</android>
 *
 */

var IOS = (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad');
var ANDROID = (Ti.Platform.osname === 'android');
var UI = require('ui');
var Map = require('ti.map');

var rows = [
    require('/tests/multiMap'),
    require('/tests/annotations'),
    require('/tests/routes'),
    require('/tests/drawing')
];

if (IOS) {
    rows.push(require('/camera'));
    rows.push(require('/properties'));
}

if (ANDROID && Map.isGooglePlayServicesAvailable() != Map.SUCCESS) {
    alert ('Google Play Services is not installed/updated/available');
} else {
    startUI();
}

function startUI() {
    UI.init(rows, function(e) {
        rows[e.index].run && rows[e.index].run(UI, Map);
    });
}
