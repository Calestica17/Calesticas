<script>
    function updateBotInfo() {
        fetch('/get_bot_name')
            .then(response => response.text())
            .then(data => {
                const [name, status, world] = data.split("|");
                document.getElementById('botName').innerText = name;
                document.getElementById('botWorld').innerText = world;
                // Check if status is 18
                if (status === "18") {
                    document.getElementById('botStatus').innerText = "Captcha Requested";
                } else if (status === "8") {
                    document.getElementById('botStatus').innerText = "Too Many Login";
                } else if (status === "1"){
                    document.getElementById('botStatus').innerText = "Online";
                } else if (status === "0"){
                    document.getElementById('botStatus').innerText = "Offline";
                } else if (status === "22"){
                    document.getElementById('botStatus').innerText = "Changing Subserver";
                } else if (status === "9"){
                    document.getElementById('botStatus').innerText = "Maintance";
                } else {
                    document.getElementById('botStatus').innerText = status;
                }
            });
    }
    
    function showScriptExecutor() {
        document.getElementById("scriptExecutorBox").style.display = "block";
    }
    
    function executeScript() {
        const growID = document.getElementById('botName').innerText;
        const scriptContent = document.getElementById("scriptTextarea").value;
    
        // Make a POST request to the server
        fetch("/run_script", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "growID=" + encodeURIComponent(growID) + "&content=" + encodeURIComponent(scriptContent),
        })
        .then(response => response.text())
        .catch(error => console.error("Error:", error));
    }                
    
    function stopScript() {
        const growID = document.getElementById('botName').innerText;
        const scriptContent = document.getElementById("scriptTextarea").value; // Replace with the actual input field or source
    
        // Make a POST request to the server
        fetch("/stop_script", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "growID=" + encodeURIComponent(growID) + "&content=" + encodeURIComponent(scriptContent),
        })
        .then(response => response.text())
        .then(alertMessage => {
            alert(alertMessage);
            // Optionally, you can perform additional actions after the script execution
        })
        .catch(error => console.error("Error:", error));
    }
    
    function cancelScript() {
        document.getElementById("scriptExecutorBox").style.display = "none";
    }
        // Function to remove the bot
        function removeBot(button) {
            const growID = button.closest('tr').querySelector('.growID').innerText;
            fetch('/remove_bot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `growID=${growID}`,
            })
                .then(response => response.text())
                .then(alertMessageRemove => {
                    alert(alertMessageRemove);
                    updateBotInfo(); // Update the bot info after removing
                });
        }
        // Function to remove the bot
        function connect(button) {
            const growID = button.closest('tr').querySelector('.growID').innerText;
            fetch('/connect_bot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `growID=${growID}`,
            })
                .then(response => response.text())
                .then(alertMessage => {
                    showModal('Connect', alertMessage);
                    updateBotInfo(); // Update the bot info after removing
                });
        }
        // Function to remove the bot
        function disconnect(button) {
            const growID = button.closest('tr').querySelector('.growID').innerText;
            fetch('/disconnect_bot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `growID=${growID}`,
            })
                .then(response => response.text())
                .then(alertMessage => {
                    alert(alertMessage);
                    updateBotInfo(); // Update the bot info after removing
                });
        }              
    
        // FUNGSI MISC
        function showMiscInput(event) {
            event.preventDefault(); // Prevent form submission
            const miscInputContainer = document.querySelector('.misc-input-container');
            miscInputContainer.style.display = 'block';
        }
    
        function performMiscAction() {
            const growID = document.getElementById('botName').innerText;
            const actionTypeSelect = document.getElementById('actionTypeSelect');
            const actionType = actionTypeSelect.options[actionTypeSelect.selectedIndex].value;
            const miscTextInput = document.getElementById('miscTextInput');
            const text = miscTextInput.value.trim();
    
            fetch('/misc_action', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `growID=${growID}&actionType=${actionType}&text=${text}`,
            })
                .then(response => response.text())
                .then(alertMessage => {
                    alert(alertMessage);
                    // Hide the misc input container after performing action
                    const miscInputContainer = document.querySelector('.misc-input-container');
                    miscInputContainer.style.display = 'block';
                    updateBotInfo();
                });
        }
        function showAutoFarmConfig() {
            const autoFarmConfig = document.getElementById('autoFarmConfig');
            autoFarmConfig.style.display = 'block';
        }
        function showAutoSpamConfig() {
            const autoSpamConfig = document.getElementById('autoSpamConfig');
            autoSpamConfig.style.display = 'block';
        }
        function showSettingConfig() {
            const settingConfig = document.getElementById('settingConfig');
            settingConfig.style.display = 'block';
        }
        function CID() {
            const createID = document.getElementById('createID');
            createID.style.display = 'block';
        }
        function toggleAutoFarm() {
            const growID = document.getElementById('botName').innerText;
            const autoPlace = document.getElementById('autoPlace').checked;
            const autoBreak = document.getElementById('autoBreak').checked;
            const farmID = document.getElementById('farmID').value;
            const farmSpeed = document.getElementById('farmSpeed').value;
            const breakTile = document.getElementById('breakTile').value;
    
            fetch('/auto_farm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `growID=${growID}&autoPlace=${autoPlace}&autoBreak=${autoBreak}&farmID=${farmID}&farmSpeed=${farmSpeed}&breakTile=${breakTile}`,
            })
                .then(response => response.text())
                .then(alertMessage => {
                    alert(alertMessage);
                    updateBotInfo();
                    hideAutoFarmConfig(); // Hide the configuration after toggling
                });
        }
    
        function cancelAutoFarm() {
            const autoFarmConfig = document.getElementById('autoFarmConfig');
            autoFarmConfig.style.display = 'none';
        }
        // Function to toggle Auto Spam
        function toggleAutoSpam() {
            const growID = document.getElementById('botName').innerText;
            const spamInterval = document.getElementById('spamInterval').value;
            const randomInterval = document.getElementById('randomInterval').checked;
            const showEmote = document.getElementById('showEmote').checked;
            const spamText = document.getElementById('spamText').value.trim();
    
            fetch('/auto_spam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `growID=${growID}&spamInterval=${spamInterval}&randomInterval=${randomInterval}&showEmote=${showEmote}&spamText=${spamText}`,
            })
                .then(response => response.text())
                .then(alertMessage => {
                    alert(alertMessage);
                    updateBotInfo();
                    cancelAutoSpam(); // Hide the configuration after toggling
                });
        }
    
        function cancelAutoSpam() {
            const autoSpamConfig = document.getElementById('autoSpamConfig');
            autoSpamConfig.style.display = 'none';
        }
        // Function to show bot backpack items in a pop-up
        function showBotBackpack(button) {
            const growID = button.closest('tr').querySelector('.growID').innerText;
    
            fetch('/get_bot_backpack?growID=' + growID)
                .then(response => response.text())
                .then(backpackItems => {
                    alert("Bot " + growID + "'s Backpack Items:\n" + backpackItems);
                });
        }
        // Function to update total count for a specific item
        function updateItemCount(itemName, count) {
            const itemElements = document.querySelectorAll('.item-name-' + itemName);
    
            itemElements.forEach(element => {
                element.nextElementSibling.innerText = count;
            });
        }
        function captchaGuest(button) {
        const growID = button.closest('tr').querySelector('.growID').innerText;
        fetch('/get_bot_captcha?growID=' + growID)
            .then(response => response.text())
            .then(infoCaptcha => {
                const newWindow = window.open(infoCaptcha, '_blank');
                if (newWindow) {
                    newWindow.focus();
                } else {
                    alert("Popup blocker may be preventing opening the link. Please check your browser settings.");
                }
            });
        }
        function createID() {
            const growID = document.getElementById('botName').innerText;
            const createGrowID = document.getElementById('createGrowID').value.trim();
            const createPassword = document.getElementById('createPassword').value.trim();
            const createEmail = document.getElementById('createEmail').value.trim();
    
            if (growID && createEmail) {
                fetch('/create_id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `growID=${growID}&createGrowID=${createGrowID}&createPassword=${createPassword}&createEmail=${createEmail}`,
                })
                    .then(response => response.text())
                    .then(alertMessage => {
                        alert(alertMessage);
                        // Optionally, you can close the form or perform other actions
                    });
            } else {
                alert('Please provide the required information');
            }
        }
    
        function cancelCreateID() {
            // Add any cleanup or hide logic if needed
            const createID = document.getElementById('createID');
            createID.style.display = 'none';
        }
        // Function to show bot backpack items in a pop-up
        function showBotInformation(button) {
            const growID = button.closest('tr').querySelector('.growID').innerText;
    
            fetch('/get_bot_information?growID=' + growID)
                .then(response => response.text())
                .then(infoBot => {
                    alert(growID + "' Bot Information :\n" + infoBot);
                });
        }
        setInterval(updateBotInfo, 100);
</script>
