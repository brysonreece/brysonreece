<?php

namespace Tests\Feature\Security;

use App\Mail\NewLoginDevice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewLoginDeviceMailTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_login_device_email_contains_correct_subject(): void
    {
        $ipDetails = [
            'status' => 'success',
            'country' => 'United States',
            'city' => 'New York',
            'query' => '192.168.1.1',
        ];

        $mailable = new NewLoginDevice($ipDetails);

        $envelope = $mailable->envelope();

        $this->assertEquals('Account Access Notification', $envelope->subject);
    }

    public function test_new_login_device_email_includes_ip_details(): void
    {
        $ipDetails = [
            'status' => 'success',
            'country' => 'United States',
            'city' => 'New York',
            'regionName' => 'New York',
            'isp' => 'Test ISP',
            'query' => '192.168.1.1',
        ];

        $mailable = new NewLoginDevice($ipDetails);

        $content = $mailable->content();

        $this->assertEquals('mail.new-login-device', $content->markdown);
        $this->assertEquals($ipDetails, $content->with['ipDetails']);
    }

    public function test_new_login_device_email_can_be_constructed_with_empty_details(): void
    {
        $mailable = new NewLoginDevice;

        $this->assertInstanceOf(NewLoginDevice::class, $mailable);
    }

    public function test_new_login_device_email_has_correct_reply_to(): void
    {
        config(['mail.from.address' => 'hello@example.com']);
        config(['mail.from.name' => 'Test App']);

        $mailable = new NewLoginDevice;
        $envelope = $mailable->envelope();

        $this->assertCount(1, $envelope->replyTo);
        $this->assertEquals('noreply@example.com', $envelope->replyTo[0]->address);
        $this->assertEquals('Test App', $envelope->replyTo[0]->name);
    }

    public function test_new_login_device_email_has_no_attachments(): void
    {
        $mailable = new NewLoginDevice;

        $this->assertEmpty($mailable->attachments());
    }
}
