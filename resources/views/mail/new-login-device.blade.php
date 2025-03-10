<x-mail::message>
# Account Access Notification

Hey there,

Your account was accessed from a new device.

If this was you, you can ignore this email. If this wasn't you, please change your password immediately.

<x-mail::table>
|                           |                                                                                                                        |
| ------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **IP Address**            | {{ $ipDetails['query'] }}                                                                                              |
| **Location**              | {{ $ipDetails['city'] }} ({{ $ipDetails['zip'] }}), {{ $ipDetails['regionName'] }}, {{ $ipDetails['country'] }}        |
| **View on Map**           | [View on Google Maps](https://www.google.com/maps/search/?api=1&query={{ $ipDetails['lat'] }},{{ $ipDetails['lon'] }}) |
| **ISP**                   | {{ $ipDetails['isp'] }}                                                                                                |
| **Organization**          | {{ $ipDetails['org'] }}                                                                                                |
| **AS**                    | {{ $ipDetails['as'] }}                                                                                                 |
| **Timezone**              | {{ $ipDetails['timezone'] }}                                                                                           |

</x-mail::table>

<x-mail::button :url="route('login')">
Login
</x-mail::button>
</x-mail::message>
