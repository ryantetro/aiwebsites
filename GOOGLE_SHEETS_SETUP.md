# Google Sheets Setup Guide

This form is configured to submit data to Google Sheets via Google Apps Script.

## Setup Instructions

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add headers in Row 1:
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`
   - Column D: `Business Name`
   - Column E: `Website`
   - Column F: `Message`

### Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete the default code and paste this script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date(),
      data.name || "",
      data.email || "",
      data.businessName || "",
      data.website || "",
      data.message || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (💾 icon) and give it a name like "Form Handler"
4. Click **Deploy** → **New deployment**
5. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
6. Set:
   - Description: "Form submission handler"
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy**
8. **Copy the Web App URL** - you'll need this!

### Step 3: Configure the Form

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add your Google Apps Script URL:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Replace `YOUR_SCRIPT_ID` with the actual ID from your deployment URL

### Step 4: Restart Your Development Server

```bash
npm run dev
```

## Testing

1. Fill out the form on your website
2. Submit it
3. Check your Google Sheet - you should see a new row with the submitted data!

## Troubleshooting

- **Form submits but nothing appears in sheet**: Make sure you deployed the script as a Web App and set access to "Anyone"
- **CORS errors**: The form uses `no-cors` mode, so you won't see response data, but submissions should still work
- **Permission denied**: Ensure the Apps Script deployment has "Anyone" access

## Notes

- The form uses `no-cors` mode, so we can't verify the response. However, submissions should work correctly.
- Data includes a timestamp automatically.
- The form validates required fields (Name, Email, Business Name, Message) before submission.
