import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.browser.customtabs.CustomTabsIntent

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val url = "https://tuneepuzzle.github.io/play"

        // 1. Initialize the CustomTabsIntent.Builder
        val builder = CustomTabsIntent.Builder()

        // 2. Optional: Customize the look (e.g., set toolbar color)
        // builder.setToolbarColor(ContextCompat.getColor(this, R.color.colorPrimary))

        // 3. Optional: Show the title of the webpage
        builder.setShowTitle(true)

        // 4. Build the intent
        val customTabsIntent = builder.build()

        try {
            // 5. Launch the URL
            customTabsIntent.launchUrl(this, Uri.parse(url))
        } catch (e: Exception) {
            // Fallback: If no browser is installed, handle it gracefully
        }

        // Note: Do not call finish() immediately here if you want
        // the user to return to your app when they close the tab.
    }
}