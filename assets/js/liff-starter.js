window.onload = function () {
    const useNodeJS = false;
    const defaultLiffId = '1653759698-w0jBrERM';

    let myLiffId = '';

    if (useNodeJS) {
        fetch('/send-id')
            .then((reqResponse) => {
                return reqResponse.json();
            }).then((jsonResponse) => {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            }).catch((error) => {
                $('#liffAppContent').addClass('hidden');
                nodeIdErrorMessage = `
                    <p>Unable to receive the LIFF ID as an environment variable.</p>
                `;
                $('#errorMessage').html(nodeIdErrorMessage);
                $('#errorMessage').removeClass('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};

/**
 * Check if myLiffId is null. If null do not initiate liff.
 * @param {string} myLiffId The LIFF ID of the selected element
 */
function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        $('#liffAppContent').addClass('hidden');
        liffIdErrorMessage = `
            <p>You have not assigned any value for LIFF ID.</p>
            <p>If you are running the app using Node.js, please set the LIFF ID as an environment variable in your
                Heroku account follwing the below steps: </p>
            <code id="code-block">
                <ol>
                    <li>Go to \`Dashboard\` in your Heroku account.</li>
                    <li>Click on the app you just created.</li>
                    <li>Click on \`Settings\` and toggle \`Reveal Config Vars\`.</li>
                    <li>Set \`MY_LIFF_ID\` as the key and the LIFF ID as the value.</li>
                    <li>Your app should be up and running. Enter the URL of your app in a web browser.</li>
                </ol>
            </code>
            <p>If you are using any other platform, please add your LIFF ID in the <code>index.html</code> file.</p>
            <p>For more information about how to add your LIFF ID, see <a href="https://developers.line.biz/en/reference/liff/#initialize-liff-app">Initializing the LIFF
                    app</a>.</p>
        `;
        $('#errorMessage').html(liffIdErrorMessage);
        $('#errorMessage').removeClass('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}

/**
 * Initialize LIFF
 * @param {string} myLiffId The LIFF ID of the selected element
 */
function initializeLiff(myLiffId) {
    liff.init({
        'liffId': myLiffId
    }).then(() => {
        // start to use LIFF's API
        initializeApp();
    }).catch((error) => {
        $('#liffAppContent').addClass('hidden');
        liffInitErrorMessage = `
            <p>Something went wrong with LIFF initialization.</p>
            <p>LIFF initialization can fail if a user clicks "Cancel" on the "Grant permission" screen, or if an error
            occurs in the process of <code>liff.init()</code>.
        `;
        $('#errorMessage').html(liffInitErrorMessage);
        $('#errorMessage').removeClass('hidden');
    });
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    registerButtonHandlers();
    if (liff.isLoggedIn()) {
        $('#login-div').addClass('hidden');
        $('#logout-div').removeClass('hidden');
        $('#cart-div').removeClass('hidden');
    } else {
        $('#login-div').removeClass('hidden');
        $('#logout-div').addClass('hidden');
        $('#cart-div').addClass('hidden');
    }

    if (liff.isInClient()) {
        $('#liffAppContent').removeClass('hidden');
    } else {
        $('#liffAppContent').addClass('hidden');
    }
}

/**
 * Register event handlers for the buttons displayed in the app
 */
function registerButtonHandlers() {
    // Open window call
    $('#openWindowButton').click(() => {
        liff.openWindow({
            url: 'https://titani.herokuapp.com/', // Isi dengan Endpoint URL aplikasi web Anda
            external: true
        });
    });

    // Close window call
    $('#closeWindowButton').click(() => {
        liff.closeWindow();
    });

    // Send message call
    $('#sendMessageButton').click(() => {
        liff.sendMessage([{
            'type': 'text',
            'text': 'Halo sahabat Tani! Selamat bergabung bersama Kami di website Titani Indonesia tempat para petani lokal.'
        }]);
    });

    // login call, only when external browser is used
    $('#login-btn').click(() => {
        if (!liff.isLoggedIn()) {
            // set `redirectUri` to redirect the user to a URL other than the front page of your LIFF app.
            liff.login();
        }
    });

    // logout call, only when external browser is used
    $('#logout-btn').click(() => {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });
}