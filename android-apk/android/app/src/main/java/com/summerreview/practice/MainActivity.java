package com.summerreview.practice;

import android.Manifest;
import android.content.pm.PackageManager;
import android.webkit.WebSettings;
import androidx.activity.OnBackPressedCallback;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final int REQ_MIC = 1001;

    @Override
    public void onCreate(android.os.Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                Bridge bridge = getBridge();
                if (bridge == null) {
                    setEnabled(false);
                    getOnBackPressedDispatcher().onBackPressed();
                    setEnabled(true);
                    return;
                }
                bridge.eval(
                    "(function(){try{return !!(window.__handleNativeBack&&window.__handleNativeBack());}catch(e){return false;}})()",
                    value -> {
                        boolean handled = "true".equals(value);
                        if (handled) return;
                        if (bridge.getWebView() != null && bridge.getWebView().canGoBack()) {
                            bridge.getWebView().post(() -> bridge.getWebView().goBack());
                            return;
                        }
                        runOnUiThread(() -> {
                            setEnabled(false);
                            getOnBackPressedDispatcher().onBackPressed();
                            setEnabled(true);
                        });
                    }
                );
            }
        });
    }

    @Override
    public void onStart() {
        super.onStart();
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.RECORD_AUDIO}, REQ_MIC);
        }
        Bridge bridge = getBridge();
        if (bridge != null && bridge.getWebView() != null) {
            WebSettings settings = bridge.getWebView().getSettings();
            settings.setMediaPlaybackRequiresUserGesture(false);
            settings.setAllowFileAccess(true);
            settings.setDomStorageEnabled(true);
        }
    }
}
