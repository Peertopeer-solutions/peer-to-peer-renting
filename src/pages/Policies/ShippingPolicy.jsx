import React from "react";
import {
  PrimaryHeading,
  SubHeading,
  Content,
} from "../../components/Design/Typography";

const ShippingPolicy = () => {
  return (
    <div>
      <body>
        <div class="container mx-auto md:px-4 ">
          <div className="bg-sky-500  pt-3 pb-1 mb-1 flex items-center justify-center">
            <PrimaryHeading>Shipping Policy</PrimaryHeading>
          </div>
          <br />
          <div>
            <SubHeading>Effective Date: [Date]</SubHeading>
            <Content>
              Thank you for choosing Rentivity, your go-to peer-to-peer rental
              application. This Shipping Policy outlines the terms and
              conditions governing the shipping and delivery of items through
              our platform. By using Rentivity, you agree to comply with this
              Shipping Policy. Please read it carefully before engaging in any
              rental transactions.
            </Content>

            <SubHeading>General Shipping Guidelines</SubHeading>
            <Content>
              1.1 Shipping Responsibility: Rentivity acts as a platform to
              connect renters and owners, facilitating rental transactions. As
              such, the shipping and delivery of rental items are the
              responsibility of the involved parties (renters and owners).
              Rentivity does not directly handle shipping or delivery, unless
              explicitly stated otherwise.
            </Content>
            <Content>
              1.2 Communication: It is crucial for both parties to communicate
              and agree upon the shipping details before initiating any rental
              transactions. We encourage renters and owners to discuss shipping
              methods, costs, and timelines to ensure a smooth rental
              experience.
            </Content>

            <SubHeading>Shipping Options</SubHeading>
            <Content>
              2.1 Owner's Responsibility: Owners are responsible for specifying
              their preferred shipping options within their rental listings.
              This includes indicating whether they provide shipping services or
              require renters to arrange for shipping independently.
            </Content>
            <Content>
              2.2 Shipping Services: If owners choose to offer shipping
              services, they should clearly outline the shipping methods
              available, associated costs, and any additional terms or
              restrictions. This information should be provided in the rental
              listing description.
            </Content>
            <Content>
              2.3 Independent Shipping: If owners do not offer shipping
              services, renters must arrange for independent shipping. Rentivity
              recommends using reputable shipping providers to ensure reliable
              and secure delivery.
            </Content>

            <SubHeading>Shipping Costs and Insurance</SubHeading>
            <Content>
              3.1 Cost Responsibility: Unless otherwise agreed upon between the
              renter and owner, shipping costs are generally the responsibility
              of the renter. The rental listing should clearly specify whether
              the owner covers any portion of the shipping expenses.
            </Content>
            <Content>
              3.2 Insurance Coverage: Rentivity strongly recommends owners and
              renters to consider appropriate insurance coverage for shipped
              items. It is the responsibility of the owner and renter to obtain
              insurance or agree on any coverage arrangements to protect against
              loss, damage, or theft during transit.
            </Content>

            <SubHeading>Shipping Timelines</SubHeading>
            <Content>
              4.1 Estimating Shipping Time: Owners should provide an estimated
              shipping timeline within their rental listings. This timeline
              should account for the time required to prepare the item for
              shipment, any necessary packaging, and the shipping transit time.
            </Content>
            <Content>
              4.2 Renter's Responsibility: Renters should review the estimated
              shipping timeline provided by the owner before confirming a
              rental. If the timeline does not meet their requirements, they
              should discuss alternative arrangements with the owner.
            </Content>

            <SubHeading>Shipping Issues and Disputes</SubHeading>
            <Content>
              5.1 Damage or Loss: In the event of damage, loss, or any
              shipping-related disputes, Rentivity encourages both parties to
              communicate promptly and attempt to resolve the issue amicably.
              Rentivity may provide dispute resolution assistance, but ultimate
              liability lies between the renter and owner.
            </Content>
            <Content>
              5.2 Support and Mediation: Rentivity aims to provide support and
              facilitate fair resolutions. If assistance is required, renters
              and owners can contact Rentivity's customer support team,
              providing relevant details and evidence for assessment and
              possible mediation.
            </Content>

            <SubHeading>Modifications to the Shipping Policy</SubHeading>
            <Content>
              Rentivity reserves the right to modify or update this Shipping
              Policy at any time. Any changes will be effective immediately upon
              posting the updated policy on our website or within the Rentivity
              application. It is your responsibility to review the Shipping
              Policy periodically to stay informed about any modifications.
            </Content>
            <Content>
              By using Rentivity's platform, you acknowledge and agree to abide
              by the terms and conditions outlined in this Shipping Policy. If
              you have any questions or require further clarification, please
              contact Rentivity's customer support team.
            </Content>

            <Content>[End of Policy]</Content>

            <h3 class="text-2xl my-3">Contacting Us</h3>

            <Content class="text-sm">
              If you have any questions about this Privacy Policy, the practices
              of this Application, or your dealings with this Application,
              please contact us at:
            </Content>

            <Content class="my-3">
              Rentivity <br />
              Daiict,Gandhinagar
              <br />
              382007
              <br />
              support@Rentivity.in
            </Content>
          </div>
        </div>
      </body>
    </div>
  );
};

export default ShippingPolicy;
