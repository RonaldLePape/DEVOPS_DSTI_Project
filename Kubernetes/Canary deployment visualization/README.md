# Visualizing a canary deploymentin Prometheus



## Generating traffic with Powershell

- Use the following Powershell script in Powershell_ISE:

        - $uri = "https://www.ronaldlepape.fr/user/getAll"
        $body = ""
        $headers = @{ "Content-Type" = "application/json" }

        $jobs = @()

        # Launch 1000 parallel requests
        for ($i = 1; $i -le 1000; $i++) {
            $jobs += Start-Job -ScriptBlock {
                param($uri, $headers, $body)
                Invoke-RestMethod -Uri $uri -Method Get -Headers $headers
            } -ArgumentList $uri, $headers
        }

        # Wait for all jobs to complete
        $jobs | ForEach-Object { $_ | Wait-Job; $_ | Receive-Job; Remove-Job $_ }



## PromQL

In Prometheus, execute the following request and display the result n the Graph tab:



        - sum by (destination_version)(
          increase(istio_requests_total{
            destination_app="mywebapp"
          }[1m])
        )


        - Note: "increase", here, displays the increase of "istio_requests_total" counter in the last 1 minute